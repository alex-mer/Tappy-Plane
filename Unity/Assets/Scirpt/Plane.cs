using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Plane : MonoBehaviour {
    public void onTap() {
        Debug.Log("tap");
        GetComponent<Rigidbody2D>().velocity = new Vector2(0f, 0f);
        GetComponent<Rigidbody2D>().AddForce(new Vector2(0f, 250f));
    }
}
