package unpsjb.labprog.backend.business;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import unpsjb.labprog.backend.model.Play;

@Service
public class PlayService {
    
    @Autowired
    PlayRepository repository;

    public List<Play> findAll(){
        List<Play> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Play findById(int id){
        return repository.findById(id).orElse(null);
    }

    public Play findByCode(String code){
        return repository.findByCode(code).orElse(null);
    }

    public Page<Play> findByPage(int page, int size){
        return repository.findAll(PageRequest.of(page,size));
    }
    
    public List<Play> search(String term){
        return repository.search("%"+term.toUpperCase()+"%");
    }


    @Transactional
    public Play save(Play e){
        return repository.save(e);
    }

    @Transactional
    public void delete(int id){
        repository.deleteById(id);
    }
}

