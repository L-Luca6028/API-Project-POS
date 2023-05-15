package com.example.accessingmongodbdatarest;

import org.springframework.data.annotation.Id;

public class ToDo {
    @Id private String id;

    private int priority;
    private String whatToDo;
    private String description;
    private String deadlineDate;
    private Boolean finished;

    public ToDo(int priority, String whatToDo, String description, String deadlineDate, Boolean finished) {
        this.priority = priority;
        this.whatToDo = whatToDo;
        this.description = description;
        this.deadlineDate = deadlineDate;
        this.finished = finished;
    }

    public ToDo() {

    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) { this.id = id; }

    public String getWhatToDo() { return this.whatToDo; }

    public void setWhatToDo(String whatToDo) { this.whatToDo = whatToDo; }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDeadlineDate() {
        return deadlineDate;
    }

    public void setDeadlineDate(String deadlineDate) {
        this.deadlineDate = deadlineDate;
    }

    public Boolean getFinished() {
        return finished;
    }

    public void setFinished(Boolean finished) {
        this.finished = finished;
    }
}
