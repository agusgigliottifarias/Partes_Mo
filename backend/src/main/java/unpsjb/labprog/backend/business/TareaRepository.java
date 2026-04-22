package unpsjb.labprog.backend.business;

import java.util.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import unpsjb.labprog.backend.model.Tarea;

@Repository
public interface TareaRepository extends CrudRepository<Tarea, Integer>, PagingAndSortingRepository<Tarea, Integer> {

    @Query("SELECT t FROM Tarea t WHERE UPPER(t.codigo) LIKE ?1 OR UPPER(t.descripcion) LIKE ?1")
    List<Tarea> search(String term);
}