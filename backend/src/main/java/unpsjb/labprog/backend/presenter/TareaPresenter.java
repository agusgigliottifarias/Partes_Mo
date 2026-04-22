package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.TareaService; 
import unpsjb.labprog.backend.model.Tarea;

@RestController
@RequestMapping("tareas") 
public class TareaPresenter {
    
    @Autowired
    TareaService service;

    @GetMapping
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Object> findById(@PathVariable("id") int id){
        Tarea tareaOrNull = service.findById(id);
        return (tareaOrNull != null) ?
            Response.ok(tareaOrNull) :
            Response.notFound("Tarea " + id + " no encontrada.");
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Tarea tarea) {
        if (tarea.getId() != 0) {
            return Response.error(tarea, "No puede tener un ID definido para crear.");
        }
        Tarea nueva = service.save(tarea);
        return Response.ok(nueva, "Tarea " + nueva.getCodigo() + " cargada.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") int id){
        service.delete(id);
        return Response.ok("Tarea " + id + " borrada.");
    }

    @GetMapping("/search/{term}")
    public ResponseEntity<Object> search(@PathVariable("term") String term){
        return Response.ok(service.search(term));
    }
}