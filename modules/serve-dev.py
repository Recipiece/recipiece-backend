#!/usr/bin/env python3
import subprocess
import sys
import time
import threading
from typing import List

if 'simple-term-menu' not in sys.modules:
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'simple-term-menu'])

from simple_term_menu import TerminalMenu

options = [
    'login',
    'dashboard',
]


def _wait_for_started(process: subprocess.Popen) -> List[str]:
    lines = []
    while (line := process.stdout.readline()):
        decoded = line.decode('utf-8')
        lines.append(decoded)
        if 'No issues found' in decoded:
            break
    return lines


def _print_output(process: subprocess.Popen, event: threading.Event):
    while not event.is_set():
        line = process.stdout.readline().decode('utf-8')
        print(line.strip())


def main():
    print('Welcome to the Recipiece frontend!')
    print('Starting the necessary root processes...')
    processes = []
    try:
        print('Starting host...')
        host_process = subprocess.Popen(
            ['yarn', '--cwd', './host', 'start'], 
            stdout=subprocess.PIPE
        )
        processes.append(host_process)
        print(''.join(_wait_for_started(host_process)))
        
        print('Starting module-common...')
        module_common_process = subprocess.Popen(
            ['yarn', '--cwd', './module-common', 'start'],
            stdout=subprocess.PIPE
        )
        processes.append(module_common_process)
        print(''.join(_wait_for_started(module_common_process)))
        
        terminal_menu = TerminalMenu(options, multi_select=True, show_multi_select_hint=True)
        menu_entry_indices = terminal_menu.show()
        for idx in menu_entry_indices:
            dir_to_load = options[idx]
            new_process = subprocess.Popen(
                ['yarn', '--cwd', f'./{dir_to_load}', 'start'],
                stdout=subprocess.PIPE
            )
            processes.append(new_process)
            print(''.join(_wait_for_started(new_process)))

        while True:
            for proc in processes:
                event = threading.Event()
                thread = threading.Thread(target=_print_output, args=(proc, event))
                thread.run()
                thread.join(2)
                if thread.is_alive():
                    event.set()
            time.sleep(5)
    except KeyboardInterrupt:
        print('Shutting down processes')
    finally:
        for proc in processes:
            proc.terminate()
            proc.wait()

main()
