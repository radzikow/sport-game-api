# Sport Game API

The Sport Game API is a server application built using NestJS, TypeORM, GraphQL, and PostgreSQL. It provides a GraphQL interface to fetch data related to players, teams, and matches for an abstract sports game.

## Installation

To install and run the project, follow the steps below:

1. Clone the repository to your local machine.
  ```
  git clone https://github.com/radzikow/sport-game-api.git
  ```
2. Navigate to the project directory.
  ```
  sport-game-api
  ```
3. Copy .env.example and create .env file. You can keep the default environments.
4. Install dependencies: `npm install`
5. Run the following command to build the Docker containers:
  ```bash
  make build
  ```
4. Run the following command to start the Docker containers:
  ```bash
  make run
  ```

This will start the PostgreSQL database, the GraphQL server, and the pgAdmin interface.

5. Access the GraphQL playground by opening your browser and navigating to `http://localhost:3000/graphql`.

## Database Seeding

To seed the database with sample data, follow the steps below:

1. Make sure that you have **psql** installed on your computer. Check how to install psql [here](https://www.timescale.com/blog/how-to-install-psql-on-mac-ubuntu-debian-windows/).

2. Open a terminal and navigate to the project directory.
3. Run the following command to seed the database:

  ```bash
  make seed
  ```

   This command will execute the `seed.psql` file and populate the database with sample data. You need to provide the password to the database (by default it's "postgres").

## GraphQL Endpoints

The Sports Game GraphQL API provides the following endpoints:

### Query: matches

Fetches a list of matches.

```graphql
query {
  matches {
    edges {
      node {
        id
        location
        dateTime
        teams {
          id
          name
        }
        players {
          id
          name
          surname
          number
        }
        teams {
          id
          name
        }
      }
    }
  }
}
```

### Query: players

Fetches a list of players.

```graphql
query {
  players {
    edges {
      node {
        id
        name
        surname
        number
        team {
          id
          name
        }
        matches {
          id
          location
          dateTime
        }
      }
    }
  }
}
```

### Query: teams

Fetches a list of teams.

```graphql
query {
  teams {
    edges {
      node {
        id
        name
        players {
          id
          name
          surname
          number
        }
      }
    }
  }
}
```

### Query: team

Fetches a specific team by ID.

```graphql
query {
  team(id: "team-id") {
    id
    name
    players {
      id
      name
      surname
      number
    }
  }
}
```

### Query: player

Fetches a specific player by ID.

```graphql
query {
  player(id: "player-id") {
    id
    name
    surname
    number
    team {
      id
      name
    }
  }
}
```

### Query: match

Fetches a specific match by ID.

```graphql
query {
  match(id: "match-id") {
    id
    location
    dateTime
    teams {
      id
      name
    }
    players {
      id
      name
      surname
      number
    }
  }
}
```

## Pagination

The API supports pagination for the `matches`, `players`, and `teams` queries. You can use the `first`, `last`, `after`, and `before` arguments to control the number of items returned and navigate through the list.

Example:

```graphql
query {
  matches(first: 10, after: "cursor") {
    edges {
      node {
        id
        location
        dateTime
        teams {
          id
          name
        }
        players {
          id
          name
          surname
          number
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

## Data Structure

The Sports Game GraphQL API uses the following data structure:

- `Match`: Represents a match in the sports game. It has properties such as `id`, `location`, `dateTime`, `teams`, and `players`.
- `Player`: Represents a player in the sports game. It has properties such as `id`, `name`, `surname`, `number`, `team`, and `matches`.
- `Team`: Represents a team in the sports game. It has properties such as `id`, `name`, and `players`.

## Data Relationships

The data relationships in the Sports Game GraphQL API are as follows:

- A `Match` can have multiple `teams` and multiple `players`.
- A `Player` belongs to a single `team` and can participate in multiple `matches`.
- A `Team` can have multiple `players`.

## Dataloader

The Sports Game GraphQL API uses dataloader to optimize data fetching and avoid the N+1 problem. It batches and caches database queries to improve performance.
