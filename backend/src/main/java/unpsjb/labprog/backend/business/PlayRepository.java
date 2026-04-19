package unpsjb.labprog.backend.business;

import java.util.*;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Play;


@Repository
public interface PlayRepository extends CrudRepository<Play,Integer>, PagingAndSortingRepository<Play, Integer> {
    

    @Query("SELECT e FROM Play e WHERE e.code = ?1")
    Optional<Play> findByCode(String code);

    @Query("SELECT e FROM Play e WHERE UPPER(e.name) LIKE ?1")
    List<Play> search(String term);
}
