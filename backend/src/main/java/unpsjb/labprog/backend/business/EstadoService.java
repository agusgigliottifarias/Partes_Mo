package unpsjb.labprog.backend.business;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import unpsjb.labprog.backend.model.Estado; 

@Service
public class EstadoService {
    
    @Autowired
    EstadoRepository repository; 

    public List<Estado> findAll() {
        return (List<Estado>) repository.findAll();
    }

    public Estado findById(int id) {
        return repository.findById(id).orElse(null); 
    }

    public Page<Estado> findByPage(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    public List<Estado> search(String term){
    return repository.search("%" + term.toUpperCase() + "%");
    }

    public Estado save(Estado estado) {
        return repository.save(estado);
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}
