package unpsjb.labprog.backend.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import unpsjb.labprog.backend.model.Customer;

@Service
public class CustomerService {
    
    @Autowired
    CustomerRepository repository;

    
    public List<Customer> findAll() {
        return (List<Customer>) repository.findAll();
    }

    
    public Customer findById(int id) {
        return repository.findById(id).orElse(null); 
    }

    public Page<Customer> findByPage(int page, int size) {
        return repository.findAll(PageRequest.of(page, size));
    }

    public List<Customer> search(String term){
        return repository.search("%"+term+"%");
    }

    public Customer save(Customer customer) {
        return repository.save(customer);
    }

    public void delete(int id) {
        repository.deleteById(id);
    }
}