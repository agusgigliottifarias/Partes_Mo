# language: es

Característica: gestión de empresas

   Esquema del escenario: Nueva Empresa (cliente) que encargan proyectos
      Dado que se ingresa el cliente con <nombre>, "<cuit>" y "<observaciones>"
      Cuando presiono el botón de guardar
      Entonces se espera la siguiente <respuesta>

      Ejemplos:
      | nombre          | cuit     | observaciones          | respuesta               |
      | Matriz Hierros  | 10101001009 | Empresa Metal-mecánica | Cliente Matriz Hierros con cuit 10101001009 cargado correctamente  |
      | Delivery        | 20202002008 |                        | Cliente Delivery con cuit 20202002008 cargado correctamente  |
      | Golfo Nuevo     | 30303003007 | Empresa pesquera       | Cliente Golfo Nuevo con cuit 30303003007 cargado correctamente  |
      | Marta Ríos      | 40404004006 |                        | Cliente Marta Ríos con cuit 40404004006 cargado correctamente  |
      | Martín Quintana | 50505005005 | Particular             | Cliente Martín Quintana con cuit 50505005005 cargado correctamente  |
