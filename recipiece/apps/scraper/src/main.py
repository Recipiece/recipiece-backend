from app import setup_app

if __name__ == '__main__':
    app = setup_app()
    app.run(host='0.0.0.0', port=8804)
