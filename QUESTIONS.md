**1. Discuss your strategy and decisions implementing the application. Please, consider time complexity, effort cost, technologies used and any other variable that you understand important on your development process.**

The first step, after reading all the documentation is to think about what kind of data the user needs, and the most efficient way to deliver the data with a continuous flow of interaction with the UI. I understood that the documentation explains that the two main entities are the Legislators and the Bills. So, I decided to build a system that allows the user, to search for any of the entities in the first screen interaction or go to an entity-dedicated page that delivers a list with all entity items and search options.

The information about a single item isn't so big, so I decided to use a simple model, delivering all the needed content, including options to see more details about related entities, as a legislator who votes against a bill.
With all the interfaces planned, I chose FastAPI as the API framework to build this solution. I could use some other technology to demonstrate my skills and my knowledge about performance analysis and decision-making, but I knew that the interface would demand plenty of implementation time, and I did not have enough space to build this sledgehammer to crack a nut. Beyond that, FastAPI delivers automatic swagger documentation and has a big set of resources to build a well-implemented RESTful API.

The directory structure is entity-oriented. Each directory has at least four files as described below:

```
📂 entity
├── __init__.py
├── models.py
├── services.py
└── repositories.py
```
The filenames are almost self-describing, so I'll skip this part, and explain why some entities do not have controllers.py or routes.py. These entities do not need routes, so do not need these files.

Going back to the front end, the chosen framework is React, with Typescript, to avoid any error mistake dealing with types or any "mysterious issue" related to Javascript. I choose to use Vite for many reasons, but the most important is the optimal build time. I believe that for you guys, do not wait 8 minutes to build the project beyond the Docker build time is good. The component Library chosen was Chakra.UI v3. About a year since the last time I have used this components library. The new version optimal for building complex components, has a kind of "agnosticism" dealing with customizations, allowing to building of a lot of different and complex themes.

In the system, was used React Hooks and ContextAPI to deal with the states and allow more efficient code.

----
**2. How would you change your solution to account for future columns that might be requested, such as “Bill Voted On Date” or “Co-Sponsors”?**

The ideal path is to build projects with scalable implementation but without overengineering. A lot of code has some overengineering to demonstrate some skills, but dealing with more columns is pretty easy and quick. All the entities have individual steps of data processing and delivery, making it easy to scale the project as I want.

---
**3. How would you change your solution if instead of receiving CSVs of data, you were given a list of legislators or bills that you should generate a CSV for?**
I should process it with Python, using Pandas, maybe using a SQLite project to store everything, or Postgres depending on project complexity and the project prevision of scale. I would write everything, split the entities, and follow the project as I have done.

**4. How long did you spend working on the assignment?**

I spent 14 hours on continuous implementation. If I had implemented it in a simple way, without all the customization, tests, and extra resources, I may have built it in 2.5 hours, just creating some tables and data visualization types.
