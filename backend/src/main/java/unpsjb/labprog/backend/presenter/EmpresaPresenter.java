package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.EmpresaService; 
import unpsjb.labprog.backend.model.Empresa;

@RestController
@RequestMapping("empresas") 
public class EmpresaPresenter {
    
    @Autowired
    EmpresaService service;

    @GetMapping
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Object> findById(@PathVariable("id") int id){
        Empresa empresaOrNull = service.findById(id);
        return (empresaOrNull != null) ?
            Response.ok(empresaOrNull) :
            Response.notFound("Empresa " + id + " no encontrada.");
    }

    @GetMapping("/search/{term}")
    public ResponseEntity<Object> search(@PathVariable("term") String term){
            return Response.ok(service.search(term));
    }

   @PostMapping
    public ResponseEntity<Object> create(@RequestBody Empresa empresa) {
        if (empresa.getId() != 0) {
            return Response.error(empresa, "No puede tener un ID definido para crear.");
        }
        
        Empresa nueva = service.save(empresa);
        
        String mensajeExito = "Cliente " + nueva.getNombre() + 
                            " con cuit " + nueva.getCuit() + 
                            " cargado correctamente";
        
        return Response.ok(nueva, mensajeExito);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") int id){
        service.delete(id);
        return Response.ok("Empresa " + id + " borrada con éxito.");
    }
}