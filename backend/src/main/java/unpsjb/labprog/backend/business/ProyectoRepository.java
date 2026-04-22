package unpsjb.labprog.backend.business;

import java.util.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import unpsjb.labprog.backend.model.Proyecto;

@Repository
public interface ProyectoRepository extends CrudRepository<Proyecto, Integer>, PagingAndSortingRepository<Proyecto, Integer>{
    
    @Query("SELECT p FROM Proyecto p WHERE UPPER(p.codigo) LIKE ?1 OR UPPER(p.descripcion) LIKE ?1")
    List<Proyecto> search(String term);

}
