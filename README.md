# 20MinCoach

Este va a ser el principal documento encargado de la documentación del Caso 1.


## Tabla de Contenidos
- [Diseño](#diseño)

## Diseño
Esta sección se encarga de definir y explicar el diseño que se seguirá en la realización del Caso 1.

(En el enunciado esta sección se divide en dos: Design Document y Detailed Layer Design Requirements.
Así que nosotros también la vamos a dividir en dos, en cada sección o sub-sección de este documento agragaremos la "respuesta" o lo que pide 
su respectiva sección del enunciado. Las voy a enlistar...)

(Más adelante podríamos cambiarle los nombres a estas secciones. De momento le pongo estos para mantener la claridad)
### Design Document
(Esta seccion se divide en tres apartados: Technology Research and Selection, N-Layer Architecture Design y Visual Components Strategy)

#### Technology Research and Selection
A rasgos generales esta sección pide hacer una investigación sobre las tecnologías que vamos a utilizar en nuestro diseño:

- Research modern frontend frameworks and libraries
- Compare technologies such as React, TailWind, Vue, Angular and similar for this specific use case
- Evaluate state management solutions such as Redux or Mutex
- Research real-time communication technologies (WebRockets, WebRTC, Notification Services)
- Select testing frameworks and tools
- Choose styling methodologies and tools
- Choose a linter and unit test technology
- Document your technology choices with justification

El último "task" nos indica lo que agregaremos a esta sección. Tratemos de ser concisos. No ingresemos documentación innecesaria
pero brindemos una buena justificación. Esta sección no debería de ser muy larga. Solo para indicarle al "programador" lo que se utiliza
en este diseño.

#### N-Layer Architecture Design
Acá va el diagrama de layers.
Talvez podríamos mostrar los layers con cajas y relacionarlos con flechas. Sería bueno tratar de agregarles un par de patrones de diseño
para la comunicación entre ellos.
Por ahí podríamos agregar un listado de las responsabilidades de cada layer abajo del diagrama.

Document this before the architecture diagram. <- Talvez podríamos acomodar el diagrama de clases abajo de la lista de responsabilidades.

#### Visual Components Strategy
Esta sección no me quedó muy clara la verdad: 
- Develop a component organization strategy, this might be lead by the technology choose
- Design how to achive a reusable component library structure, those are steps for the developers
- Create a component development workflow based on the technology selected, those are steps for the developers
- Establish component testing methodology, this is not theory, are steps for the developers

### Detailed Layer Design Requirements
Esta sección indica las especificaciones esperadas de cada layer. Estrategias que el profe espera que apliquemos en los layers.
#### Visual Components
No me queda muy claro
- Design a component hierarchy based on the selected technology
- Specify how reusable UI components will work
- Decide accessibility standards
- Design the responsive guidelines within code examples of the practices that the dev team must to follow
- Object design patterns might be required
#### Controllers
Consider a strong usage of dependency injection
Do not forget clarify the hook-based connectors in the controllers
#### Model
Design the most important model classes, specially for those required for the key design patterns in your solution
Implement model validation documenting with an example what validator are you going to use and how to use it, provide developers with instructions of how to create more validators
#### Middleware
Design and implement an error handling middleware
Design and implement an log events middleware
All of them are required to be code and provide implementation templates or examples in the source code to guide software engineers
#### Business
Study the theory of domain driven design and what technology is available in the choosen language to achive such paradigm. Indicar qué tecnología permite lograr el paradigma.
Implement domain-specific rules and validation
Provide implementation templates or examples in the source code to guide software engineers
#### Services
Design API client abstraction layer, providing templates of how APis are going to be integrated into the future. Me parece que hay que crear un tipo de diagrama para esto.
Create the client for the security layer, this is going to be functional code. Este me parece que ya está.
#### Background
Provide implementation templates or examples in the source code to guide software engineers. Este layer no lo tenemos en el source code. Hay que ver cómo lo agregramos.
Object design patterns might be required, pub/sub
#### Validators
Correlate this section with the model design
Provide at least one example of the validator and proper guidelines as explained in model. Me parece que esto ya está.
#### DTOs
Explain how and when DTOs are going to be required.
Create a transformation template and example to be use between API calls and frontend models, this can be a middleware as well.
#### State management
Select and design the state management solution
Include this on either the architecture diagram or class diagram. Hay que ver cómo lo metemos en alguno de esos diagramas.
#### Styles
Choose and design how CSS or styles are going to be manage
Design the responsive rules of the design and how the responsiveness is going to be test
Design an strategy for dark/light mode support and how to test it. Ojo ahí.
Provide clear instructions to developers
#### Utilities
Desing the utilities layers modeling with one example is enough. Puede que esto ya se haya conseguido en src/PoC/src/utils
Singleton pattern might require. Hay que revisar si tiene Singleton.
#### Exception Handling
Design and implement in code an standard way to handle exceptions. No tenemos un plan para manejar excepciones. Hay que definirlo
Make sure the exception handling use the logging layer. No tenemos logging layer.
Object design patterns might be required
Make sure all code templates and examples use it
#### Logging
Design structured logging system using strategy pattern to allow multiple logging providers
Implement a general Logger class
Make sure all code templates and examples use it
#### Security
Design authentication and authorization layers. Me parece que esto ya lo tenemos pero no como layer.
This is going to be result of the authorization PoC and the Client layer
#### Linter Configuration
Select a linting tool
Define code style rules and conventions
Include the linter in the project and document guidelines
Include the linter rules file adding a custom rule of your desire
No tenemos nada de esto.
#### Build and Deployment Pipeline
Design build process for different environments
Create development, staging, and production builds in the configuration files
Create deployment documentation guidelines in the readme.md
Add environment variable files
Add pipeline for runing unit test
Document instructions for developers on how to run the app, run the test and the deployment
Tampoco tenemos nada de esto.