package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintln(w, `{"status":"ok"}`)
	})

	log.Println("backend listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
