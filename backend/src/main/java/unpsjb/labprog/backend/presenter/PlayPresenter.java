package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.PlayService;
import unpsjb.labprog.backend.model.Play;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("plays")
public class PlayPresenter {
    
    @Autowired
    PlayService service;

    @RequestMapping(method=RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value = "/id/{id}", method=RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") int id){
        Play aPlayOrNull = service.findById(id);
        return(aPlayOrNull != null)?
            Response.ok(aPlayOrNull):
            Response.notFound("Obra " + id + " no encontrada.");
        
        
    }
    
    @RequestMapping(value = "/code/{code}", method=RequestMethod.GET)
    public ResponseEntity<Object> findByCode(@PathVariable("code") String code){
        Play aPlayOrNull = service.findByCode(code);
        return(aPlayOrNull != null)?
            Response.ok(aPlayOrNull):
            Response.notFound("Obra codigo " + code + " no encontrada.");
        
        
    }

    @RequestMapping(value = "/page",method=RequestMethod.GET)
    public ResponseEntity<Object> findByPage(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam (defaultValue = "10") int size){
            return Response.ok(service.findByPage(page, size));
    }

    @RequestMapping(value = "/search/{term}",method=RequestMethod.GET)
    public ResponseEntity<Object> search(
        @PathVariable("term") String term){
            return Response.ok(service.search(term));
    }


    @RequestMapping(method=RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Play aPlay) {
        if (aPlay.getId() !=0){
            return Response.error( /*aca fijarse en Reponse si poner la clase error */
                aPlay,
                "Esta intentado crear una obra. Esta no puede tener un id definido. "
            );
        }

        return Response.ok(service.save(aPlay));
    }
    
    @RequestMapping(method=RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Play aPlay)  {
        if (aPlay.getId() <=0){
            return Response.error(
                aPlay,
                "Debe especificar un id valido para poder modificar una obra"
            );
        }
        return Response.ok(service.save(aPlay));
        
    }

    @RequestMapping(value = "/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") int id){
        service.delete(id);
        return Response.ok("obra " + id + " borrada con exito");
    }
    
}
