package unpsjb.labprog.backend.presenter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.BorderoService;
import unpsjb.labprog.backend.model.Bordero;
import org.springframework.web.bind.annotation.RequestMethod;



@RestController
@RequestMapping("borderos")
public class BorderoPresenter {

    @Autowired
    private BorderoService service;

    @RequestMapping(method=RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }
    
    @RequestMapping(value="/id/{id}", method= RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id")int id) {
        Bordero aBorderoOrNull = service.findById(id);
        return (aBorderoOrNull != null)? 
            Response.ok(aBorderoOrNull): 
            Response.notFound();

    }
    
    @RequestMapping(method=RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Bordero aBordero) {
        return Response.ok(
            service.create(aBordero),
            "Bordero creado correctamente"
        );
    }

    @RequestMapping(value="/id/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") int id) {
        service.delete(id); 
        return Response.ok(null, "Bordero eliminado correctamente");
    }
}