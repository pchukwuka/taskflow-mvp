# Use official Nginx Alpine image as base
FROM nginx:alpine

# Set maintainer label
LABEL maintainer="Your Startup Team"
LABEL description="TaskFlow MVP - Project Management Web Application"

# Remove default Nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy application files to Nginx html directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Copy custom Nginx configuration (optional - using default)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the application
EXPOSE 80

# Health check to ensure the container is running properly
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
