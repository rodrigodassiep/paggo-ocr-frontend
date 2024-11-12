# paggo-ocr-frontend

## Information

### Prerequisites
WARNING! This project depends on *yarn* to work

### General Overview
This repository contains the frontend service implemented with NextJS. It is composed of three main pages:
1. Home
2. Login
3. Register

### Home
This is the main page where the user uploads the image and receives the query, also being able to see and download previous queries. This page is only accessible to authenticated users.

### Login
Simple page to handle basic frontend login service

### Register
Simple page to handle basic frontend register service

## Instructions for setting up and running locally

### Prerequisites
1. **Node.js & Yarn**: Ensure you have Node.js and Yarn installed.
   - Check Node.js version: `node -v`
   - Install Yarn (if needed): `npm install -g yarn`

### Setup
1. **Clone/Init Project**: Clone the repository or initialize a new Next.js project.
2. **Install Dependencies**: Run:
   ```bash
   yarn install
   ```
3. **Environment Variables**: Create a `.env.local` file with:
   ```env
    BACKEND_API_URI=http://localhost:3000
    NEXT_PUBLIC_API_KEY=your_aws_s3_key
    NEXT_PUBLIC_SECRET_API_KEY=your_aws_s3_secret_key
    NEXT_PUBLIC_S3_BUCKET=your_aws_s3_bucket
    NEXT_PUBLIC_S3_REGION=your_aws_s3_bucket-region
   ```
   Where BACKEND_API_URI is the URL of the NestJS API.

### Run Application
Make sure you are not running the app in the same port as the NestJS API:
- Dev mode: `yarn dev -p 3001`
In our example, the NestJS API is listening to port 3000, so we run our NextJS app in 3001.


### Styling
- **Tailwind CSS**: This project uses Tailwind CSS, with configuration available in `tailwind.config.js` (if pre-configured).

### Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)