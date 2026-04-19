package unpsjb.labprog.backend.business;

import java.util.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Customer;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Integer>, PagingAndSortingRepository<Customer, Integer> {
    
    
    @Query("SELECT e FROM Customer e WHERE UPPER(e.name) LIKE ?1")
    List<Customer> search(String term);

    
}