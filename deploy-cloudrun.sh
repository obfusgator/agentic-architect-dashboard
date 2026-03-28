#!/bin/bash
set -e

# Configuration
PROJECT_ID="gen-lang-client-0004729873"
REGION="us-central1"
SERVICE_NAME="agentic-dashboard"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "=== Deploying to Cloud Run ==="

# Build Docker image
echo "Building Docker image..."
docker build --platform linux/amd64 -t ${IMAGE_NAME} .

# Push to GCR
echo "Pushing to Google Container Registry..."
docker push ${IMAGE_NAME}

# Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --port 3000 \
  --memory 256Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10

echo "=== Deployed! ==="
echo "Enable IAP in Google Cloud Console:"
echo "1. Go to Cloud Run > ${SERVICE_NAME}"
echo "2. Click 'Permissions' > 'Add Principal'"
echo "3. Add 'allUsers' with 'Cloud Run Invoker' role"
echo "4. Enable IAP in Security > Identity-Aware Proxy"
