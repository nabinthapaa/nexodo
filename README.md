# Introduction

This is a simple todo application created with NextJs.

### Features

1. User management
1. CRUD functionality
1. Local Sqlite DB
1. OAuth with github

# Setting up the project

1. Clone the repo and cd into the repo

```bash
    git clone ""
    cd nexodo
```

2. Install the required dependencies and run script to make database and tables

```bash
    npm i
    node db.js
```

3. To get the auth working set up <strong>.env</strong> file in root folder as

```env
    GITHUB_ID=your_client_id
    GITHUB_SECRET=your_client_secret
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_URL_INTERNAL=http://localhost:3000
    NEXTAUTH_SECRET= run 'openssl rand -base64 32'
```

4. Run server using

```bash
npm run dev
```

Sever will open at [http://localhost:3000/](Localhost:3000)
