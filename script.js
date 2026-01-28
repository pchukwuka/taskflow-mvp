// Task Manager Application
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderTasks();
        this.updateStats();
    }

    setupEventListeners() {
        // Form submission
        const form = document.getElementById('taskForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('taskTitle').value.trim();
        const project = document.getElementById('taskProject').value.trim();
        const priority = document.getElementById('taskPriority').value;
        const dueDate = document.getElementById('taskDueDate').value;

        if (!title) return;

        const task = {
            id: Date.now(),
            title,
            project: project || 'General',
            priority,
            dueDate,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        
        // Reset form with animation
        e.target.reset();
        this.showNotification('Task created successfully!');
    }

    handleFilter(e) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        this.currentFilter = e.target.dataset.filter;
        this.renderTasks();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showNotification('Task deleted successfully!');
        }
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    renderTasks() {
        const tasksList = document.getElementById('tasksList');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            tasksList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">⚡</div>
                    <h3>${this.currentFilter === 'all' ? 'NO TASKS YET' : 'NO ' + this.currentFilter.toUpperCase() + ' TASKS'}</h3>
                    <p>${this.currentFilter === 'all' ? 'Create your first task to get started' : 'Try a different filter'}</p>
                </div>
            `;
            return;
        }

        tasksList.innerHTML = filteredTasks.map((task, index) => {
            const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }) : 'No due date';

            return `
                <div class="task-card priority-${task.priority} ${task.completed ? 'completed' : ''}" style="animation-delay: ${index * 0.05}s">
                    <div class="task-header">
                        <div class="task-checkbox-wrapper">
                            <input 
                                type="checkbox" 
                                class="task-checkbox" 
                                ${task.completed ? 'checked' : ''}
                                onchange="taskManager.toggleTask(${task.id})"
                            >
                            <div class="task-content">
                                <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                                <p class="task-project">${this.escapeHtml(task.project)}</p>
                            </div>
                        </div>
                        <div class="task-actions">
                            <button class="btn-delete" onclick="taskManager.deleteTask(${task.id})">
                                DELETE
                            </button>
                        </div>
                    </div>
                    <div class="task-meta">
                        <div class="task-priority">
                            <span class="priority-badge ${task.priority}">${task.priority}</span>
                        </div>
                        <div class="task-due-date">
                            📅 ${dueDate}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const active = total - completed;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('activeTasks').textContent = active;
        document.getElementById('completedTasks').textContent = completed;
    }

    showNotification(message) {
        // Simple notification - could be enhanced with a toast library
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-yellow);
            color: var(--primary-black);
            padding: 1rem 2rem;
            font-weight: 600;
            letter-spacing: 0.1em;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            box-shadow: 0 4px 0 rgba(0, 0, 0, 0.8);
            font-family: 'IBM Plex Mono', monospace;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTasks() {
        localStorage.setItem('taskflow_tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const stored = localStorage.getItem('taskflow_tasks');
        return stored ? JSON.parse(stored) : [];
    }
}

// Additional CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application
const taskManager = new TaskManager();

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Focus on title input when pressing 'N'
    if (e.key.toLowerCase() === 'n' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        document.getElementById('taskTitle').focus();
    }
});

// Log initialization
console.log('🚀 TASKFLOW MVP initialized successfully!');
console.log('📊 Tasks loaded:', taskManager.tasks.length);
