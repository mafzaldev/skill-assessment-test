# Skill Assessment Test

## Instructions

The app comprises of two parts: a front-end and a back-end. The front-end is a simple Next.js app that displays a list of todos. The back-end is an Express app that serves the front-end and provides an API to fetch the list of todos from MongoDB.

### Backend

1. Clone the repository
2. Move to `backend` directory
3. Install the dependencies by running `npm install`
4. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```
   DATABASE_URL=<your_mongodb_uri>
   PORT=<specify_port>
   ```

5. Run `npx prisma generate`, which will generate the Prisma client
6. Run `npx prisma db push`, which will push the schema to the database
7. Run the backend by running `npm run dev`

### Frontend

1. Move to `frontend` directory
2. Install the dependencies by running `npm install`
3. Create a `.env` file in the `frontend` directory and add the following environment variables:

   ```
   NEXT_BACKEND_URL=http://localhost:{specified_port}
   ```

4. Run the app by running `npm run dev`
5. Open the app in your browser at `http://localhost:3000`
