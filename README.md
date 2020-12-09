# Upload Demo
This project is minimal sample of upload large files to App Platform.  
It only display progress of upload on server and client.  
Server does not store the file anywhere.

## Deployment
- Build docker image `docker build . --tag ${DOCKER_REGISTRY}/upload:latest`
- Push docker image to image repository `docker push ${DOCKER_REGISTRY}/upload:latest`
- Deploy to Digital Ocean `doctl apps create --spec spec.yaml`

## Files
- Medium size file (151 MB)
  http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
- Large size file (2,6 GB)
  https://releases.ubuntu.com/20.04.1/ubuntu-20.04.1-desktop-amd64.iso

## Issue
We have investigated that App platform is unable to transfer large files.
When user tries to upload Large file (for example ubuntu image 2,6 GB) it is terminated after approximately 2 minutes with error net::ERR_CONNECTION_RESET or net::ERR_CONNECTION_CLOSED
  
Server is able to process Medium file but we have discovered that server starts processing file after it is fully uploaded by client.
  
We have faced simmilar issue with different project and we resolved the issue by turning off request buffering. In nginx that can be achieved by `proxy_request_buffering off`. Sadly app platform does not support setting such option.
