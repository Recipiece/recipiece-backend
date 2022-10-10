import logging

def get_logger(name: str = __name__):
    log_format = '[%(asctime)s] -- %(message)s'
    logging.basicConfig(format=log_format)
    logger = logging.getLogger(name)
    return logger
