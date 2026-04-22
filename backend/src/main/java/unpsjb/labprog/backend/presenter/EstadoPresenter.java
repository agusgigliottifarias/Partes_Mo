package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.EstadoService; 
import unpsjb.labprog.backend.model.Estado;

@RestController
@RequestMapping("estados") 
public class EstadoPresenter {
    
    @Autowired
    EstadoService service;

    @GetMapping
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Object> findById(@PathVariable("id") int id){
        Estado estadoOrNull = service.findById(id);
        return (estadoOrNull != null) ?
            Response.ok(estadoOrNull) :
            Response.notFound("Estado " + id + " no encontrado.");
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Estado estado) {
        if (estado.getId() != 0) {
            return Response.error(estado, "No puede tener un ID definido para crear.");
        }
        Estado nuevo = service.save(estado);
        return Response.ok(nuevo, "Estado " + nuevo.getNombre() + " creado.");
    }

    @GetMapping("/search/{term}")
    public ResponseEntity<Object> search(@PathVariable("term") String term){
        return Response.ok(service.search(term));
    }
}