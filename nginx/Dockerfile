FROM nginx:alpine

# Copiar configuração do nginx
COPY conf/nginx.conf /etc/nginx/nginx.conf

# Copiar certificados SSL
COPY ssl/fullchain-ds.pem /etc/nginx/ssl/fullchain-ds.pem
COPY ssl/privkey-ds.pem /etc/nginx/ssl/privkey-ds.pem
COPY ssl/fullchain-mcp.pem /etc/nginx/ssl/fullchain-mcp.pem
COPY ssl/privkey-mcp.pem /etc/nginx/ssl/privkey-mcp.pem
COPY ssl/fullchain-api.pem /etc/nginx/ssl/fullchain-api.pem
COPY ssl/privkey-api.pem /etc/nginx/ssl/privkey-api.pem

# Expor portas HTTP e HTTPS
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
