package com.example.accessingmongodbdatarest;

import org.springframework.web.bind.annotation.*;

import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin("*") // Damit kein Cross-Origin Header-Fehler im Browser ausgelöst wird. Mit * kann jede Domäne auf die React-App zugreifen
public class ToDoController {


    // Für das Aufrufen von den Funktionen vom Repository
    private final ToDoRepository repository;

    ToDoController(ToDoRepository repository) {
        this.repository = repository;
    }

    // Reading (Lesen), Alle Datensätze sollen abgefragt werden
    @RequestMapping("/ToDos/all")
    List<ToDo> all() {
        System.out.println("Super es funktioniert!!!");
        return repository.findAll();
    }

    // Es soll nur der Datensatz mit der mitgegebenen id angezeigt werden
    @RequestMapping("/ToDos/find/{id}")
    Optional<ToDo> findToDoById(@PathVariable String id) {
        return repository.findById(id);
    }

    // Es soll nur der Datensatz mit dem mitgegebenen Namen angezeigt werden
    @RequestMapping("/ToDos/{whatToDo}")
    List<ToDo> findToDoByName(@PathVariable String whatToDo) {
        return repository.findByWhatToDo(whatToDo);
    }

    // Write (Schreiben)
    @PostMapping("/ToDos/save")
    ToDo newToDo(@RequestBody ToDo newToDo)
    {
        System.out.println("Posten funktioniert auch!");
        return repository.save(newToDo);
    }

    // Update (Aktualisieren)
    @PutMapping("/ToDos/{id}")
    ToDo replaceToDo(@RequestBody ToDo newToDo, @PathVariable String id) {
        System.out.println("Erfolgreich geupdated");
        return repository.findById(id)
                .map(toDo -> {
                    toDo.setPriority(newToDo.getPriority());
                    toDo.setWhatToDo(newToDo.getWhatToDo());
                    toDo.setDescription(newToDo.getDescription());
                    toDo.setDeadlineDate(newToDo.getDeadlineDate());
                    toDo.setFinished(newToDo.getFinished());
                    return repository.save(toDo);
                })
                .orElseGet(() -> {
                    newToDo.setId(id);
                    return repository.save(newToDo);
                });
    }

    // Delete (Löschen)
    @DeleteMapping("/ToDos/{id}")
    void deleteToDo(@PathVariable String id) {
        System.out.println("Gelöscht");
        repository.deleteById(id);
    }

}
