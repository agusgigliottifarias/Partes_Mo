package unpsjb.labprog.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Entity
@Getter 
@Setter 
@NoArgsConstructor
public class Proyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String codigo;
    private String descripcion;

    @ManyToOne
    private Empresa empresa;

    @ManyToOne
    private Estado estado;


    @OneToMany(mappedBy = "proyecto")
    private List<Tarea> tareas;
}