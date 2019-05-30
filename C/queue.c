#include <stdio.h>
#include <stdlib.h>

#define TRUE 1
#define FALSE 0

typedef struct node{
    int data;
    struct node * next;
} MyStack;

/** Initialize your data structure here. */

MyStack* myStackCreate() {
    MyStack *stack = (MyStack*)malloc(sizeof(MyStack));
    stack->next = NULL;
    return stack;
}

/** Push element x onto stack. */
void myStackPush(MyStack* obj, int x) {
  MyStack * stack = (MyStack*)malloc(sizeof(MyStack));
  stack->data = x;
  stack->next = obj->next;
  obj->next = stack;
}

/** Removes the element on top of the stack and returns that element. */
int myStackPop(MyStack* obj) {
  MyStack *stack = obj->next;
  int data = stack->data;
  obj->next = stack->next;
  free(stack);
  return data;
}

/** Get the top element. */
int myStackTop(MyStack* obj) {
  return obj->next->data;
}

/** Returns whether the stack is empty. */
int myStackEmpty(MyStack* obj) {
  if (NULL == obj->next) {
    return TRUE;
  } else {
    return FALSE;
  }
}

void myStackFree(MyStack* obj) {
  free(obj);
}

int main() {
  MyStack * stack = myStackCreate();
  myStackPush(stack, 1);
  myStackPush(stack, 2);
  myStackPush(stack, 3);
  printf("%d\n", myStackPop(stack));
  printf("%d\n", myStackPop(stack));
  printf("%d\n", myStackPop(stack));
  return TRUE;
}
