# language: es

Característica: gestión de empresas

   Esquema del escenario: Nueva Empresa (cliente) que encargan proyectos
      Dado que se ingresa el cliente con <nombre>, "<cuit>" y "<observaciones>"
      Cuando presiono el botón de guardar
      Entonces se espera la siguiente <respuesta>

      Ejemplos:
      | nombre          | cuit     | observaciones          | respuesta               |
      | Matriz Hierros  | 10-10100100-9 | Empresa Metal-mecánica | Cliente Matriz Hierros con cuit 10-10100100-9 cargado correctamente  |
      | Delivery        | 20-20200200-8 |                        | Cliente Delivery con cuit 20-20200200-8 cargado correctamente  |
      | Golfo Nuevo     | 30-30300300-7 | Empresa pesquera       | Cliente Golfo Nuevo con cuit 30-30300300-7 cargado correctamente  |
      | Marta Ríos      | 40-40400400-6 |                        | Cliente Marta Ríos con cuit 40-40400400-6 cargado correctamente  |
      | Martín Quintana | 50-50500500-5 | Particular             | Cliente Martín Quintana con cuit 50-50500500-5 cargado correctamente  |
