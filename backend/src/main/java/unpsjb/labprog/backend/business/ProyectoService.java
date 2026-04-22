package unpsjb.labprog.backend.business;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import unpsjb.labprog.backend.model.Proyecto; 

@Service
public class ProyectoService {
    @Autowired
    ProyectoRepository repository; 

    public List<Proyecto> findAll() {
        return (List<Proyecto>) repository.findAll();
    }

    public Proyecto findById(int id) {
        return repository.findById(id).orElse(null); 
    }

    public Page<Proyecto> findByPage(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    public List<Proyecto> search(String term){
        return repository.search("%" + term.toUpperCase() + "%");
    }

    public Proyecto save(Proyecto proyecto) {
        return repository.save(proyecto);
    }

    public void delete(int id) {
        repository.deleteById(id);
    }

}
