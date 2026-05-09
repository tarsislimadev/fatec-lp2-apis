# Project Plan — Fatec Rio Claro app

## Goal

Deliver the Fatec Rio Claro application (mobile + web + backend) and publish it on AWS with a secure, automated, and maintainable infrastructure.

## Summary of repo context

Source details from PROMPT.md: app uses React Native (mobile), React (web), Python/Flask backend with Socket.IO, PostgreSQL and Redis. Core features: people roles, classes, events, student projects, partner businesses.

## Objectives

- Provide local dev experience and containerized builds

- CI/CD for build, test, and deploy

- AWS infra as code (Terraform)

- Use managed AWS services for scalability, security, and cost control

## High-level architecture

- Mobile: React Native (App Store / Play Store builds) or Expo

- Web: React.js static app (S3 + CloudFront)

- Backend: Flask app containerized, running on AWS ECS Fargate behind ALB

- Database: Amazon RDS (PostgreSQL)

- Cache: Amazon ElastiCache (Redis)

- Messaging/Realtime: WebSockets via Flask-SocketIO on ECS (or Amazon MQ if needed)

- Container registry: Amazon ECR

- CI/CD: GitHub Actions building images and running Terraform + deployments

- DNS/TLS: Amazon Route 53 + AWS Certificate Manager + CloudFront

- Secrets: AWS Secrets Manager or Parameter Store

- Monitoring: Amazon CloudWatch + X-Ray

## Step-by-step Plan (deliverables & mapping to AWS)

1. Review repository and requirements

- Verify code in `src/` and requirements; list missing pieces. (Local)

2. Define and document architecture

- Draw simple diagrams, decide ECS Fargate vs EKS, choose RDS instance class, VPC layout.

3. Prepare local development

- Add `docker-compose` for local backend, Postgres, Redis; add env example files.

4. Containerize services

- Create Dockerfiles for backend and web client; verify images build locally.

5. Add automated tests

- Unit tests for backend; basic integration smoke tests (DB migrations).

6. CI pipeline (GitHub Actions)

- Build images, run tests, push to ECR on merge to `main`.

7. Infrastructure as Code (Terraform)

- Modules: networking (VPC, subnets), RDS (Postgres), ElastiCache (Redis), ECR, ECS cluster, ALB, IAM roles, CloudWatch, Route53, ACM, Secrets Manager.

8. ECR and image build

- Configure ECR repos, GitHub Actions to push images with tags and latest.

9. ECS Fargate deployment

- Task definitions, services behind ALB with health checks and autoscaling policies.

10. Database migration and seeding

- Secure connectivity to RDS, apply migrations, seed initial data.

11. Domain, TLS, CDN

- Host web app on S3 + CloudFront, provision ACM cert, map domain with Route 53.

12. Secrets and configuration

- Store DB credentials and API keys in Secrets Manager; rotate keys policy.

13. Monitoring, logging, and alerts

- Send logs to CloudWatch Logs, set alarms for high error rate / high CPU, enable X-Ray traces.

14. Testing, QA, and blue/green rollout

- Run staging environment, perform load tests, rollout with ECS deployment strategies.

15. Security & cost review

- Run IAM least-privilege checks, enable VPC endpoints, estimate costs and set budgets.

16. Documentation & runbook

- Add `README`, run/deploy steps, rollback instructions, and runbook for incidents.

## Minimal AWS service choices (initial)

- Compute: ECS Fargate

- Registry: ECR

- DB: RDS for PostgreSQL (Multi-AZ optional)

- Cache: ElastiCache (Redis)

- CDN: CloudFront + S3

- DNS: Route 53

- Certificates: ACM

- Secrets: Secrets Manager

- IaC: Terraform

- CI/CD: GitHub Actions

- Monitoring: CloudWatch, X-Ray

## Security & compliance notes

- Use IAM roles for tasks, not static keys in code

- Enforce TLS everywhere (ALB + CloudFront)

- Limit inbound access via security groups and private subnets for RDS

- Use parameterized DB credentials stored in Secrets Manager

- Scan container images for vulnerabilities

## Testing & validation

- Unit tests, integration tests, end-to-end smoke tests

- Staging environment mirroring production

- Health checks and synthetic monitoring (CloudWatch Synthetics optional)

## Rollout & rollback strategy

- Deploy to staging, run automated tests, then promote image to production tag

- Use ECS deployment configuration supporting rolling updates and minimum healthy percent

- Maintain database backups and point-in-time recovery; pre-run migration backups

## Estimated timeline (rough)

- Repo review & local dev: 1–2 days

- Dockerization & tests: 2–4 days

- CI/CD & ECR: 1–2 days

- Terraform infra & staging: 3–5 days

- Production rollout & hardening: 2–4 days

Total: ~2–3 weeks (one engineer, part-time variability)

## Next steps I can take now

- Create `PLAN.md` (this file). ✅

- Optionally scaffold `terraform/` with networking and ECS modules.

- Add `docker-compose` for local development.

## Terraform plan (detailed)

- Layout: `terraform/` with `modules/` (vpc, ecs, rds, redis, ecr, alb, iam) and `envs/` for `staging` and `prod` workspaces.

- Remote state: S3 backend + DynamoDB for state locking; separate state per workspace.

- Variables & secrets: keep non-sensitive defaults in `terraform.tfvars.example`; store secrets (DB password, API keys) in AWS Secrets Manager and reference them via outputs.

- Networking: create VPC with public/private subnets, NATs, route tables, and security groups for ALB, ECS tasks, RDS, and ElastiCache.

- Compute: ECS cluster (Fargate), task definitions per service, IAM task roles, ALB target groups and listeners, autoscaling policies.

- Data: RDS Postgres with encrypted storage, automated backups, parameter group; ElastiCache Redis in private subnets.

- Registry & CI integration: ECR repo resources and lifecycle policies; IAM roles for GitHub Actions (OIDC) or short-lived credentials.

- Observability: CloudWatch log groups, metrics, and IAM roles for pushing logs/traces.

- Outputs: ALB DNS, ECR repo URIs, RDS endpoint (or Secrets Manager ARNs), and security group IDs.

- Process: develop modules locally, run `terraform init` -> `terraform plan` -> `terraform apply` in CI with manual approval for production.

## GitHub Actions workflows (recommended)

- `ci.yml`: triggered on PRs — install dependencies, run unit tests and linters for backend and frontend, build Docker images locally and run smoke tests (no push).

- `image-build-and-push.yml`: on merge to `main` — build images, run tests, tag images (`sha`, `latest`, `staging`), scan images (e.g., Trivy), and push to ECR. Use GitHub OIDC for AWS permissions.

- `terraform-plan.yml`: on PRs to `main` or changes under `terraform/` — run `terraform init` and `terraform plan`, post plan as a PR comment; fail on policy violations (terratest or Sentinel/OPA checks).

- `terraform-apply.yml`: manual/elevated workflow for `main` — requires approval, then runs `terraform apply` against the appropriate workspace (`staging` or `prod`). Use OIDC or short-lived credentials and restrict who can approve.

- `deploy-ecs.yml`: after images pushed to ECR — update ECS task definitions and trigger a service deployment (use `aws ecs update-service` or GitHub Action for ECS deploy). Use image digests to ensure immutability.

- Secrets & permissions: prefer GitHub OIDC to assume an IAM role for CI jobs; store minimal secrets in GitHub Secrets when OIDC isn't available.

- Notifications & gating: post workflow results to PRs, Slack/Teams via webhook on failures, and require passing `ci.yml` and `terraform-plan.yml` checks before merging.
