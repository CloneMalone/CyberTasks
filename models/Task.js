export class Task {
    constructor({ id, task_name, created_at }) {
        this.id = id;
        this.task_name = task_name;
        this.created_at = created_at;
    }

    get formattedDate() {
        const date = new Date(this.created_at);
        return date.toLocaleString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }
}