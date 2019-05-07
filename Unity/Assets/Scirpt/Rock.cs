using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rock : MonoBehaviour {
    public float speed;
    public float startPosition;
    public float endPosition;

    public void Update() {
        if (Config.state == "game") {
            if (transform.position.x < endPosition) {
                toStart();
            }

            transform.position = new Vector3(transform.position.x - speed, transform.position.y, transform.position.z);
        }
    }

    public void toStart() {
        transform.position = new Vector3(startPosition, transform.position.y, transform.position.z);
    }
}
