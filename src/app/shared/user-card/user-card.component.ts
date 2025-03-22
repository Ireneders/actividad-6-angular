import { Component, EventEmitter, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() miUser!: IUser;
  userService = inject(UserService);
  @Input() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();

  deleteUser(_id: string) {
    toast(`Vas a borrar al usuario ${this.miUser.username}`, {
      action: {
        label: 'Borrar',
        onClick: async () => {
          let response = await this.userService.delete(_id);
          this.deleteItemEmit.emit(true);
          toast.success('User deleted successfully');
        },
      },
    });
  }

}
