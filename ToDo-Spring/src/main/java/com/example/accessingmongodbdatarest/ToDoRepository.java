package com.example.accessingmongodbdatarest;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "ToDoListe", path = "ToDo")
public interface ToDoRepository extends MongoRepository<ToDo, String> {

    // Um eine Notiz per Namen zu finden
    List<ToDo> findByWhatToDo(String whatToDo);

}
