package unpsjb.labprog.backend.business;

import java.util.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Empresa;

@Repository
public interface EmpresaRepository extends CrudRepository<Empresa, Integer>, PagingAndSortingRepository<Empresa, Integer> {
    
    @Query("SELECT e FROM Empresa e WHERE UPPER(e.nombre) LIKE ?1")
    List<Empresa> search(String term);
}