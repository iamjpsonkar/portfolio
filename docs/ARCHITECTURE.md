# Selected System Architecture Notes

These diagrams are intentionally **high-level and conceptual**. They describe public project capabilities and the boundaries visible from their documentation; they are not production deployment diagrams, exhaustive data-flow maps, or disclosures of employer-internal architecture.

## 1. JSAT — codebase intelligence

JSAT builds a local structural index of a repository and makes it available to developer tools and AI clients.

```mermaid
flowchart TD
    Repo[Source repository] --> Parser[Language-aware parsing]
    Parser --> Extract[Symbols and relationship extraction]
    Extract --> Index[Local SQLite index]
    Index --> API[Query and context APIs]
    API --> CLI[CLI]
    API --> SDK[Python SDK]
    API --> MCP[MCP server]
    CLI --> Dev[Developer]
    SDK --> App[Developer application]
    MCP --> Agent[AI assistant]
```

**Design themes:** index once, query repeatedly; keep the index local and inspectable; expose the same repository context through multiple interfaces.

## 2. PRView — local pull-request workflow

PRView brings repository comparison and review actions into a local application.

```mermaid
flowchart LR
    User[Developer] --> UI[Web interface]
    UI --> API[Application API]
    API --> Git[Git repository operations]
    Git --> Diff[Diff and change views]
    API --> Review[Review comments and decisions]
    API --> Conflict[Conflict-resolution workflow]
    API --> Actions[Merge, squash, and rebase]
    Diff --> UI
    Review --> UI
    Conflict --> UI
    Actions --> Repo[(Local repository)]
```

**Design themes:** keep review context close to the repository; make Git operations explicit; present review feedback and repository state in one workflow.

## 3. PED Tools — HTTP proxy and mock server

PED Tools helps developers inspect API traffic and simulate upstream behavior during integration work.

```mermaid
flowchart TD
    Client[Application under test] --> Proxy[HTTP proxy]
    Proxy --> Match{Matching mock rule?}
    Match -->|Yes| Mock[Mock response engine]
    Match -->|No| Upstream[Configured upstream API]
    Mock --> Response[HTTP response]
    Upstream --> Response
    Proxy --> History[Request history]
    Mock --> Rules[Conditional response rules]
    Operator[Developer / operator UI] --> Rules
    Operator --> History
    Operator --> Limits[Rate-limit configuration]
```

**Design themes:** deterministic test behavior, visibility into requests, and fewer dependencies on live third-party services.

## 4. JaySoft DBMocker — schema-aware synthetic data

DBMocker uses database schema information to generate test data while respecting relational constraints.

```mermaid
flowchart TD
    Schema[(Database schema)] --> Inspect[Schema introspection]
    Inspect --> Model[Tables, columns, and constraints]
    Model --> Plan[Dependency-aware generation plan]
    Plan --> Generate[Synthetic record generation]
    Generate --> Validate[Constraint and relationship validation]
    Validate --> Dataset[(Test dataset)]
    Dataset --> Target[(Test database)]
```

**Design themes:** schema-driven generation, referential integrity, and repeatable datasets for integration testing.

## 5. Payment and refund platform contributions

The following is a contribution-level view of the problem space, not a representation of Fynd's internal services or production topology.

```mermaid
flowchart LR
    Commerce[Checkout / order flow] --> Payment[Payment orchestration]
    Payment --> Connectors[Gateway and payment-mode integrations]
    Connectors --> Providers[External payment providers]
    Providers --> Result[Provider response / transaction outcome]
    Result --> State[Order and payment state]
    State --> Refund[Refund lifecycle]
    Refund --> Recovery[Retry, reconciliation, and recovery paths]
    Ops[Operational tooling and observability] -. supports .-> Payment
    Ops -. supports .-> Refund
```

**Engineering concerns:** idempotent operations, retries, provider failures, transaction-state consistency, secure integration boundaries, and observable recovery paths.

---

## How to read these diagrams

- Arrows show conceptual responsibility or information flow, not guaranteed synchronous calls.
- Storage and technology labels are included only where they are part of the publicly described project.
- The payment diagram deliberately avoids internal service names, event schemas, infrastructure topology, credentials, or proprietary implementation details.
- For source code and implementation details, follow the repository links from the [portfolio](../index.html) and [case studies](../projects.html).
