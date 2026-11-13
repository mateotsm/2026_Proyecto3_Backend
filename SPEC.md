# Especificación de Requerimientos y Diseño Funcional (MVP)

## Problem Statement

Actualmente, los gimnasios de barrio y centros de entrenamiento gestionan las rutinas de sus clientes de forma manual o desarticulada (planillas en papel, notas de texto o chats). Esta modalidad genera problemas clave:
- Los entrenadores no disponen de un catálogo centralizado ni de mecanismos que garanticen una distribución muscular balanceada y consistente a lo largo del mes.
- Los clientes pierden visibilidad sobre las cargas y repeticiones objetivo, y no cuentan con un mecanismo ágil para registrar lo efectivamente realizado serie por serie (peso, repeticiones logradas y fatiga o fallos).
- El control de asistencia y el seguimiento de la evolución física (peso e Índice de Masa Corporal) se realiza de forma esporádica y desconectada del entrenamiento diario, impidiendo evaluar el cumplimiento de objetivos de fuerza, resistencia o salud física.

## Solution

Desarrollar un sistema de gestión y seguimiento del entrenamiento orientado a gimnasios con dos roles diferenciados:
1. **Administrador / Entrenador (cuenta compartida)**: Permite administrar un catálogo persistente de ejercicios y diseñar planificaciones mensuales estructuradas con reglas duras de balance muscular, días de entrenamiento (2 a 5 días) y ejercicios destacados.
2. **Cliente / Deportista**: Permite consultar la planificación diaria, registrar en tiempo real los resultados de cada serie (peso levantado, repeticiones y tipo de fallo), computar su asistencia diaria de forma automática al registrar actividad, y registrar periódicamente su peso corporal para visualizar su evolución de IMC categorizada por edad.

---

## User Stories

### Rol: Administrador / Entrenador (Gimnasio)

1. **As an Administrador**, I want to iniciar sesión mediante una cuenta administrativa única compartida, so that todos los profesores del gimnasio podamos gestionar rutinas sin necesidad de crear múltiples cuentas operativas.
2. **As an Administrador**, I want to registrar nuevos ejercicios en un catálogo general especificando nombre, descripción, grupo muscular, subgrupo y tipo de actividad (pesas o aeróbico), so that queden disponibles para cualquier planificación actual o futura.
3. **As an Administrador**, I want to consultar y filtrar el catálogo maestro de ejercicios por grupo muscular y tipo, so that pueda encontrar rápidamente ejercicios adecuados al armar una rutina.
4. **As an Administrador**, I want to crear una rutina mensual para un cliente específico definiendo fecha de inicio, fecha de fin y el objetivo principal (fuerza o resistencia), so that el cliente tenga una planificación estructurada para las próximas semanas.
5. **As an Administrador**, I want to definir una meta de IMC mensual para el cliente dentro de su rutina, so that el cliente tenga un parámetro de referencia claro para su evolución antropométrica.
6. **As an Administrador**, I want to configurar la cantidad de días de entrenamiento semanales (entre 2 y 5 días) dentro de la rutina, so that la planificación se adapte a la frecuencia semanal acordada con el cliente.
7. **As an Administrador**, I want to asignar grupos musculares específicos a cada día de entrenamiento garantizando que ningún grupo muscular se repita en la misma semana, so that se respete la regla de recuperación y consistencia muscular.
8. **As an Administrador**, I want to agregar ejercicios a cada día de entrenamiento indicando orden, series, repeticiones objetivo (o tiempo para aeróbicos), descanso e intensidad (seria, moderada o tranquila), so that el cliente conozca exactamente la pauta de trabajo.
9. **As an Administrador**, I want to marcar exactamente 2 ejercicios destacados por cada día de entrenamiento de la rutina, so that el sistema y el cliente puedan enfocar el seguimiento del progreso en los levantamientos principales.
10. **As an Administrador**, I want to recibir un error de validación claro si intento crear una rutina que viole las reglas duras (días fuera de rango 2-5, repetición de grupo muscular o cantidad incorrecta de destacados), so that la planificación siempre cumpla con los estándares metodológicos establecidos.
11. **As an Administrador**, I want to consultar el historial de rutinas activas y anteriores de cualquier cliente, so that pueda evaluar su adherencia histórica y planificar el mes siguiente.
12. **As an Administrador**, I want to consultar el registro de asistencias y los entrenamientos completados por los clientes, so that pueda monitorear la constancia de los usuarios en el gimnasio.

### Rol: Cliente / Deportista

13. **As a Cliente**, I want to registrar mi cuenta de usuario ingresando mis datos personales (nombre, correo, contraseña, fecha de nacimiento y estatura en centímetros), so that el sistema cuente con mi perfil biométrico base.
14. **As a Cliente**, I want to iniciar sesión con mis credenciales, so that pueda acceder de forma segura a mis entrenamientos y registros personales.
15. **As a Cliente**, I want to consultar mi rutina activa del mes con el detalle de días de entrenamiento y ejercicios planificados, so that sepa qué grupo muscular y qué movimientos me tocan realizar.
16. **As a Cliente**, I want to ver para cada ejercicio planificado la carga sugerida, series, repeticiones/tiempo objetivo, intensidad y tiempo de descanso promedio, so that pueda ejecutar la sesión según las directivas del profesor.
17. **As a Cliente**, I want to registrar serie por serie los resultados obtenidos en mi entrenamiento (peso real levantado, repeticiones logradas y tiempo en aeróbicos), so that quede constancia exacta de mi esfuerzo.
18. **As a Cliente**, I want to indicar en cada serie si alcancé fallo muscular (mecánico), fallo técnico o ninguno, so that quede documentado el nivel de exigencia alcanzado.
19. **As a Cliente**, I want to que mi asistencia diaria al gimnasio se marque y confirme automáticamente en cuanto guarde mi primera serie realizada del día, so that no dependa de un check-in manual o externo.
20. **As a Cliente**, I want to registrar periódicamente (al final de cada semana) mi peso corporal actual en kilogramos, so that el sistema mantenga actualizado mi histórico de composición corporal.
21. **As a Cliente**, I want to que el sistema calcule automáticamente mi IMC a partir de mi peso registrado y mi estatura de perfil, clasificando mi estado según mi edad (saludable, sobrepeso, etc.), so that conozca mi condición de salud física sin hacer cálculos manuales.
22. **As a Cliente**, I want to visualizar un gráfico de evolución de mi IMC a lo largo de las semanas de la rutina y entre rutinas del mismo año, so that pueda verificar si me acerco a mi meta saludable.
23. **As a Cliente**, I want to visualizar un gráfico de progresión de cargas y repeticiones de los ejercicios destacados de mi rutina, so that compruebe si logré el objetivo de fuerza o resistencia estipulado.

---

## Implementation Decisions

### Módulos y Arquitectura
- **Backend Framework**: NestJS modularizado por dominios (`AuthModule`, `UsersModule`, `ExercisesModule`, `RoutinesModule`, `WorkoutsModule`, `ImcModule`).
- **Persistencia**: TypeORM con base de datos MySQL (puerto `3310` en entorno local).
- **Control de Acceso**: Roles definidos por enum (`ADMIN` y `CLIENTE`), custodiados por Guards y decoradores de roles a nivel de controlador.
- **Validación**: `ValidationPipe` global con `class-validator` y `class-transformer` para validar DTOs entrantes antes de llegar a la lógica de negocio.

### Reglas de Negocio Duras (Validaciones de Servicio)
- **Rutina**:
  - Días de entrenamiento semanales: mínimo 2, máximo 5.
  - Grupos musculares por semana: unívocos; ningún grupo muscular se repite en días distintos dentro de una misma semana.
  - Ejercicios destacados: exactamente 2 ejercicios destacados marcados por cada día planificado.
  - Fechas: `fechaFin` posterior a `fechaInicio` con vigencia nominal de 1 mes (4 semanas).
- **Asistencia Automática**:
  - Al recibir una o más series en `POST /workouts/sessions/sets`, se busca o crea la `WorkoutSession` del día para el cliente y se marca `asistenciaConfirmada = true`.
- **Cálculo de IMC y Edad**:
  - Edad: calculada a partir de la diferencia en años entre la fecha actual y `user.fechaNacimiento`.
  - Fórmula: $\text{IMC} = \frac{\text{pesoKg}}{(\text{alturaCm} / 100)^2}$.
  - Clasificación OMS ajustada por edad almacenada en la entidad `ImcRecord`.

---

## Testing Decisions

- **Estrategia de Pruebas**: Foco en pruebas de comportamiento externo (API seams) a través de pruebas de integración y E2E utilizando `vitest` y `supertest`.
- **Puntos de Corte (Seams)**:
  - `POST /auth/register` y `POST /auth/login`: Verificación de alta de usuario y entrega de token con rol correcto.
  - `POST /routines`: Verificación de rechazo con código 400 ante violaciones de reglas duras (grupos musculares duplicados, días < 2 o > 5, destacados != 2 por día) y aceptación con código 201 ante planificaciones válidas.
  - `POST /workouts/sets`: Verificación de inserción de serie y creación automática del registro de asistencia del día.
  - `POST /imc`: Verificación de cálculo matemático exacto de IMC y clasificación correspondiente.

---

## Out of Scope

- Pasarela de cobros o pagos de cuotas del gimnasio.
- Notificaciones push o envío de correos electrónicos automáticos (recordatorios de entrenamiento).
- Modo offline para el registro de series sin conexión a internet.
- Temporizador en pantalla (cronómetro interactivo) dentro de la aplicación cliente para el conteo de descansos (queda para la interfaz frontend).

---

## Further Notes

- El catálogo de ejercicios es acumulativo: los ejercicios cargados por los profesores nunca se eliminan automáticamente tras finalizar una rutina, sino que quedan disponibles para reutilizarse.
- El modelo admite registrar tanto ejercicios de sobrecarga (peso en kg y repeticiones) como ejercicios aeróbicos o con peso corporal (tiempo en segundos y/o repeticiones).

