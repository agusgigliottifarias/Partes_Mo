package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.ProyectoService; 
import unpsjb.labprog.backend.model.Proyecto;
import java.util.List;

@RestController
@RequestMapping("proyectos") 
public class ProyectoPresenter {
    
    @Autowired
    ProyectoService service;

    @GetMapping
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Object> findById(@PathVariable("id") int id){
        Proyecto proyectoOrNull = service.findById(id);
        return (proyectoOrNull != null) ?
            Response.ok(proyectoOrNull) :
            Response.notFound("Proyecto " + id + " no encontrado.");
    }

    @GetMapping("/search/{term}")
    public ResponseEntity<Object> search(@PathVariable("term") String term){
        return Response.ok(service.search(term));
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Proyecto proyecto) {
        if (proyecto.getId() != 0) {
            return Response.error(proyecto, "No puede tener un ID definido para crear.");
        }
        
        Proyecto nuevo = service.save(proyecto);
        
        String mensajeExito = "Proyecto " + nuevo.getCodigo() + 
                            " (" + nuevo.getDescripcion() + ") " + 
                            "cargado correctamente";
        
        return Response.ok(nuevo, mensajeExito);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") int id){
        service.delete(id);
        return Response.ok("Proyecto " + id + " borrado con éxito.");
    }
}