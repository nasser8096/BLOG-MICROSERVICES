# BLOG-MICROSERVICES

A **scalable microservices-based blogging platform** with AI-powered features, rich-text editing, and fast performance.

---

## Features

- **Roles**
  - **Author** – Create and manage blogs.
  - **User** – Read blogs.
- **Custom Blog Editor**: Integrated **Jodit Editor** for rich-text blog creation.
- **Scalability & Communication**
  - **RabbitMQ** – Asynchronous communication between microservices.
  - **gRPC** – Synchronous communication for real-time service interaction.
- **Performance Optimization**: **Redis** used for fast data access and caching.
- **AI-Powered Blogging**: Integrated **Gemini API (GenAI)** for automatic blog titles and descriptions.
- **Frontend**: Built with **Next.js**.
- **Backend**: Organized as multiple microservices.

---

## Tech Stack

| Layer        | Technology |
|-------------|------------|
| Frontend     | Next.js, Jodit Editor |
| Backend      | Node.js, Express, Microservices |
| Messaging    | RabbitMQ |
| Communication| gRPC |
| Caching      | Redis |
| AI           | Gemini API (GenAI) |
| Database     | MongoDB / PostgreSQL (depending on your setup) |

---

## Folder Structure

microservice-app/
├── frontend/ # Next.js frontend
├── services/
│ ├── auth-service/ # Authentication microservice
│ ├── blog-service/ # Blog management microservice
│ ├── user-service/ # User management microservice
├── docker-compose.yml # Optional: container orchestration
├── README.md

yaml
Copy code

---

## Setup & Installation

1. **Clone the repo**
```bash
git clone https://github.com/nasser8096/BLOG-MICROSERVICES.git
cd BLOG-MICROSERVICES
Install dependencies

bash
Copy code
# Frontend
cd frontend
npm install

# Services
cd ../services/auth-service
npm install
cd ../blog-service
npm install
cd ../user-service
npm install
Environment Variables

Create .env files in each service and frontend with the required keys:

ini
Copy code
PORT=4000
DB_URI=<your-db-uri>
RABBITMQ_URI=<your-rabbitmq-uri>
REDIS_URI=<your-redis-uri>
GENAI_API_KEY=<your-gemini-api-key>
Run locally

bash
Copy code
# Each service
cd services/auth-service
npm run dev

cd ../blog-service
npm run dev

cd ../user-service
npm run dev

# Frontend
cd ../../frontend
npm run dev
Communication Flow
gRPC: Used for synchronous requests between microservices (e.g., fetching user info in blog-service).

RabbitMQ: Used for asynchronous events (e.g., sending notifications when a blog is published).

AI Integration
Gemini API (GenAI) automatically generates blog titles and descriptions based on the blog content.

Easily extendable to add summaries, tags, or SEO meta descriptions.

Contributing
Fork the repository.

Create a feature branch: git checkout -b feature/YourFeature

Commit your changes: git commit -m "Add feature"

Push to the branch: git push origin feature/YourFeature

Create a Pull Request.

License
MIT License © 2025 Nasseruddhin Shaik

yaml
Copy code

---

If you want, I can also make a **super clean 1-page version with badges, live demo link, and architecture diagram placeholders**, which looks **GitHub professional**.  

Do you want me to do that next?
