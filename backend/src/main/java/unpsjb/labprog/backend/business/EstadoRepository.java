package unpsjb.labprog.backend.business;

import java.util.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Estado;

@Repository
public interface EstadoRepository extends CrudRepository<Estado, Integer>, PagingAndSortingRepository<Estado, Integer> {
    
    @Query("SELECT e FROM Estado e WHERE UPPER(e.nombre) LIKE ?1")
    List<Estado> search(String term);
}
