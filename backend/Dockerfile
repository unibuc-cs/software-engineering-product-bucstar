# Use the official .NET Core SDK as a parent image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /backend

# Copy the project file and restore any dependencies (use .csproj for the project name)
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the application code
COPY . .
RUN dotnet publish -c Release -o /backend/out

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /backend
COPY --from=build /backend/out ./

# Set environment variables for ASP.NET Core
ENV ASPNETCORE_URLS="http://+:5009" \
    ASPNETCORE_ENVIRONMENT=Development

# Expose the necessary ports
EXPOSE 5009

# Start the application
ENTRYPOINT ["dotnet", "backend.dll"]