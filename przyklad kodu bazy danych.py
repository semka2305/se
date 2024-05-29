@app.route('/api/tasks', methods=['GET'])
def get_all_tasks():
    cursor.execute('SELECT * FROM tasks')
    tasks = cursor.fetchall()

    # Konwersja wyników z bazy danych na format JSON
    json_tasks = []
    for task in tasks:
        json_task = {
            'id': task[0],
            'title': task[1],
            'description': task[2],
            'priority': task[3],
            'deadline': task[4].strftime('%Y-%m-%d'),
            'completed': task[5],
            'user_id': task[6]
        }
        json_tasks.append(json_task)

    return jsonify(json_tasks)
