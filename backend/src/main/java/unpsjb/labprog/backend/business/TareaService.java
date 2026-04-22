package unpsjb.labprog.backend.business;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import unpsjb.labprog.backend.model.Tarea; 

@Service
public class TareaService {
    @Autowired
    TareaRepository repository; 

    public List<Tarea> findAll() {
        return (List<Tarea>) repository.findAll();
    }

    public Tarea findById(int id) {
        return repository.findById(id).orElse(null); 
    }

    public Page<Tarea> findByPage(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    public List<Tarea> search(String term){
        return repository.search("%" + term.toUpperCase() + "%");
    }

    public Tarea save(Tarea tarea) {
        return repository.save(tarea);
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}