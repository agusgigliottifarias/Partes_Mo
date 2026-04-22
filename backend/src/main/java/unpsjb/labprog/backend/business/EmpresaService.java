package unpsjb.labprog.backend.business;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import unpsjb.labprog.backend.model.Empresa;
import unpsjb.labprog.backend.model.Estado; 

@Service
public class EmpresaService {
    
    @Autowired
    EmpresaRepository repository; 

    public List<Empresa> findAll() {
        return (List<Empresa>) repository.findAll();
    }

    public Empresa findById(int id) {
        return repository.findById(id).orElse(null); 
    }

    public Page<Empresa> findByPage(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    public List<Empresa> search(String term){
    return repository.search("%" + term.toUpperCase() + "%");
    }

    public Empresa save(Empresa empresa) {
        return repository.save(empresa);
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}