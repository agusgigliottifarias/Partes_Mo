package unpsjb.labprog.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Performance {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int audience;

    @ManyToOne
    private Play play;
}
