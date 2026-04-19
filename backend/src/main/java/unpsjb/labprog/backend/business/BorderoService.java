package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import unpsjb.labprog.backend.model.Bordero;

@Service
public class BorderoService {

    @Autowired
    private BorderoRepository repository;

    public List<Bordero> findAll() {
        List<Bordero> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Bordero findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Bordero create(Bordero aBordero) {
        return repository.save(aBordero);
    }

    @Transactional
    public void delete(int id) {
        repository.deleteById(id);
    }
}