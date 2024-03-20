document.addEventListener("DOMContentLoaded", async function () {
    // Add Task Form Submission
    const addTaskForm = document.getElementById("addTaskForm");
    addTaskForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const formData = new FormData(addTaskForm);
        const taskData = {
            courseId: formData.get("courseId"),
            taskName: formData.get("taskName"),
            description: formData.get("description"),
            dueDate: formData.get("dueDate")
        };

        try {
            const response = await fetch('/courses/' + taskData.courseId + '/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                throw new Error('Failed to add task.');
            }

            // Clear form after successful submission
            addTaskForm.reset();
        } catch (error) {
            console.error('Error adding task:', error);
            // Handle error - display error message to the user
        }
    });

    // Get Task Form Submission
    const getTaskForm = document.getElementById("getTaskForm");
    getTaskForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const courseId = document.getElementById("getCourseId").value;
        try {
            const response = await fetch('/courses/' + courseId + '/tasks');

            if (!response.ok) {
                throw new Error('Failed to fetch tasks.');
            }

            const tasks = await response.json();
            // Populate taskTable with tasks
            const taskTable = document.getElementById("taskTable");
            taskTable.innerHTML = `
                <tr>
                    <th>Task Name</th>
                    <th>Description</th>
                    <th>Due Date</th>
                </tr>
            `;
            tasks.forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${task.taskName}</td>
                    <td>${task.description}</td>
                    <td>${task.dueDate}</td>
                `;
                taskTable.appendChild(row);
            });
        } catch (error) {
            console.error('Error getting tasks:', error);
            // Handle error - display error message to the user
        }
    });

    // Populate Course List
    try {
        const response = await fetch('/courses');
        if (!response.ok) {
            throw new Error('Failed to fetch courses.');
        }

        const courses = await response.json();
        const coursesList = document.getElementById("courses");
        courses.forEach(course => {
            const li = document.createElement("li");
            li.textContent = course;
            coursesList.appendChild(li);
        });
    } catch (error) {
        console.error('Error getting courses:', error);
        // Handle error - display error message to the user
    }
});